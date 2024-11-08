import { Body, Controller, UseGuards, Get, Post, Param, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard, AuthUser } from "../auth/jwt.guard";
import { ApiBearerAuth, ApiTags, ApiParam } from '@nestjs/swagger';
import { User } from "../database/entities";
import { GetUserResponse, UserUpdateBioRequest, GetLikesResponse } from "../dtos/dtos.entity";
import { UserService } from "./user.service";


@ApiTags('user')
@Controller('user')
export class UserController {
	constructor(private user_service: UserService) { }

	@ApiParam({ name: "guid", required: true, description: "User GUID" })
	@Get(":guid/query")
	async query_user(@Param() param: { guid: string }): Promise<GetUserResponse> {
		const user = await this.user_service.find_user_with_guid(param.guid);
		if (!user) {
			throw new ForbiddenException("User does not exist!");
		}

		return { 
			email: user.email,
			guid: user.guid,
			first_name: user.first_name,
			last_name: user.last_name,
			bio: user.bio,
			gender: user.gender,
			pronouns: user.pronouns,
			sexual_orientation: user.sexual_orientation,
			birthday_ms_since_epoch: user.birthday.getTime(),
			height_mm: user.height_mm,
			occupation: user.occupation,
		};
	}

	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Post("update_bio")
	async update_bio(@AuthUser() user: User, @Body() req: UserUpdateBioRequest): Promise<GetUserResponse> {
		const res = await this.user_service.update_user_bio(
			user.guid,
			req.first_name,
			req.last_name,
			req.bio,
			req.gender,
			req.pronouns,
			req.sexual_orientation,
			req.birthday_ms_since_epoch,
			req.height_mm,
			req.occupation
		);

		if (res.err) {
			throw new ForbiddenException(res.val);
		}

		const updated_user = res.val;

		return { 
			email: updated_user.email,
			guid: updated_user.guid,
			first_name: updated_user.first_name,
			last_name: updated_user.last_name,
			bio: updated_user.bio,
			gender: updated_user.gender,
			pronouns: updated_user.pronouns,
			sexual_orientation: updated_user.sexual_orientation,
			birthday_ms_since_epoch: updated_user.birthday.getTime(),
			height_mm: updated_user.height_mm,
			occupation: updated_user.occupation,
		};
	}

	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Get("get_likes")
	async get_likes(@AuthUser() user: User): Promise<GetLikesResponse> {
		const res = await this.user_service.find_likes(user.guid);

		if (res.err) {
			throw new ForbiddenException(res.val);
		}

		return { guids: res.val.map(user => user.guid) };
	}


	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Get("get_likes")
	async get_mutual_likes(@AuthUser() user: User): Promise<GetLikesResponse> {
		const res = await this.user_service.find_mutual_likes(user.guid);

		if (res.err) {
			throw new ForbiddenException(res.val);
		}

		return { guids: res.val.map(user => user.guid) };
	}

}

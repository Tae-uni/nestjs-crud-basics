import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profiles')
export class ProfilesController {
	constructor(private readonly profilesService: ProfilesService) {}
	// GET /profiles?location=
	@Get()
	findAll() {
		return this.profilesService.findAll();
	}

	// GET /profiles/:id
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.profilesService.findOne(id);
	}

	// POST /profiles
	@Post()
	create(@Body() CreateProfileDto: CreateProfileDto) {
		return this.profilesService.create(CreateProfileDto);
	}

	// PUT /profiles/:id
	@Put(':id')
	update(
		@Param('id') id: string,
		@Body() updateProfileDto: UpdateProfileDto) {
		return this.profilesService.update(id, updateProfileDto);
	}

	// DELETE /profiles/:id
	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	remove(@Param('id') id: string) {
		this.profilesService.remove(id);
	}
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, HttpCode, HttpStatus, HttpException, NotFoundException, ParseUUIDPipe, ValidationPipe } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import type { UUID } from 'crypto';

@Controller('profiles')
export class ProfilesController {
	constructor(private readonly profilesService: ProfilesService) {}
	// GET /profiles
	@Get()
	findAll() {
		return this.profilesService.findAll();
	}

	// GET /profiles/:id
	@Get(':id')
	findOne(@Param('id', ParseUUIDPipe) id: UUID) {
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
		@Param('id', ParseUUIDPipe) id: UUID,
		@Body() updateProfileDto: UpdateProfileDto) {
		return this.profilesService.update(id, updateProfileDto);
	}

	// DELETE /profiles/:id
	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	remove(@Param('id', ParseUUIDPipe) id: UUID) {
		this.profilesService.remove(id);
	}
}

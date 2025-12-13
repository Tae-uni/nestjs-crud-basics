import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class ProfilesService {
    private profiles = [
		{
			id: randomUUID(),
			name: 'John Doe',
			description: `Looking for a software developer position. I'm a full-stack developer with 5 years of experience in building web applications.`,
		},
		{
			id: randomUUID(),
			name: 'Jane Smith',
			description: `Experienced graphic designer seeking freelance opportunities. Skilled in Adobe Creative Suite and branding.`,
		},
		{
			id: randomUUID(),
			name: 'Alice Johnson',
			description: `Marketing professional with a passion for digital marketing and social media strategies. Looking for new challenges.`,
		}
	];

	findAll() {
		return this.profiles;
	}

	findOne(id: string) {
		const matchingProfile = this.profiles.find((profile) => profile.id === id);

		if (!matchingProfile) {
			throw new NotFoundException(`Profile with ID ${id} not found`);
		}

		return matchingProfile;
	}

	create(createProfileDto: CreateProfileDto) {
		const newProfile = {
			id: randomUUID(),
			...createProfileDto,
		}

		this.profiles.push(newProfile);
		return newProfile;
	}

	update(id: string, updateProfileDto: UpdateProfileDto) {
		const matchingProfile = this.profiles.find(
			(existingProfile) => existingProfile.id === id
		);

		if (!matchingProfile) {
			throw new NotFoundException(`Profile with ID ${id} not found`);
		}

		matchingProfile.name = updateProfileDto.name;
		matchingProfile.description = updateProfileDto.description;
		
		return matchingProfile;
	}

	remove(id: string): void {
		const matchingProfileIndex = this.profiles.findIndex(
			(profile) => profile.id === id
		);

		if (matchingProfileIndex === -1) {
			throw new NotFoundException(`Profile with ID ${id} not found`);
		}

		this.profiles.splice(matchingProfileIndex, 1);
	}
}
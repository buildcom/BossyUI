export class BossyFormValidatorsConfig{
	constructor(
		public minimum?: number,
		public tooShort?: string,
		public maximum?: number,
		public tooLong?: string,
		public is?: number,
		public wrongLength?: string,
		public presence?: boolean,
		public email?: boolean,
		public emailMessage?: string,
		public regexp?: string,
		public regexpFlag?: string,
		public regexpMessage?: string
	){}
}

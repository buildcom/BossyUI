export interface BossyFormTextareaValidatorInterface {
	email?: {
		pattern?: string,
		message?: string
	};
	length?: {
		notValid?: string,
		minimum?: number,
		tooShort?: string,
		maximum?: number,
		tooLong?: string,
		is?: number,
		wrongLength?: string,
		message?: string
	};
	datetime?: {
		earliest?: Date,
		latest?: Date,
		dateOnly?: boolean
		notValid?: string,
		tooEarly?: string,
		tooLate?: string
	};
	exclusion?: any;
	format?: {
		pattern?: string,
		flags?: string,
		message?: string
	};
	inclusion?: any;
	numericality?: {
		notValid?: string,
		notInteger?: string,
		notGreaterThan?: string,
		notGreaterThanOrEqualTo?: string,
		notEqualTo?: string,
		notLessThan?: string,
		notLessThanOrEqualTo?: string,
		notDivisibleBy?: string,
		notOdd?: string,
		notEven?: string,
		onlyInteger?: boolean,
		strict?: boolean,
		greaterThan?: number,
		greaterThanOrEqualTo?: number,
		equalTo?: number,
		lessThanOrEqualTo?: number,
		lessThan?: number,
		divisibleBy?: number,
		odd?: boolean,
		even?: boolean
	};
	presence?: {
		allowEmpty?: boolean,
		message?: string
	};
	url?: {
		message?: string,
		schemes?: any,
		allowLocal?: boolean
	};
}

export class BossyFormTextareaValidatorConfig {
	public email?: {
		pattern?: string,
		message?: string,
	};
	public length?: {
		notValid?: string,
		minimum?: number,
		tooShort?: string,
		maximum?: number,
		tooLong?: string,
		is?: number,
		wrongLength?: string,
		message?: string
	};
	public datetime?: {
		earliest?: Date,
		latest?: Date,
		dateOnly?: boolean
		notValid?: string,
		tooEarly?: string,
		tooLate?: string
	};
	public exclusion?: any;
	public format?: {
		pattern?: string,
		flags?: string,
		message?: string
	};
	public inclusion?: any;
	public numericality?: {
		notValid?: string,
		notInteger?: string,
		notGreaterThan?: string,
		notGreaterThanOrEqualTo?: string,
		notEqualTo?: string,
		notLessThan?: string,
		notLessThanOrEqualTo?: string,
		notDivisibleBy?: string,
		notOdd?: string,
		notEven?: string,
		onlyInteger?: boolean,
		strict?: boolean,
		greaterThan?: number,
		greaterThanOrEqualTo?: number,
		equalTo?: number,
		lessThanOrEqualTo?: number,
		lessThan?: number,
		divisibleBy?: number,
		odd?: boolean,
		even?: boolean
	};
	public presence?: {
		allowEmpty?: boolean,
		message?: string
	};
	public url?: {
		message?: string,
		schemes?: any,
		allowLocal?: boolean
	};

	constructor(options: BossyFormTextareaValidatorInterface) {
		Object.assign(this, options);
	}
}

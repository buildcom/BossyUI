export class BossyFormInputValidatorConfig {
	constructor(
		public email?: {
			PATTERN?: string,
			message?: string,
		},
		public length?: {
			notValid?: string,
			minimum?: number,
			tooShort?: string,
			maximum?: number,
			tooLong?: string,
			is?: number,
			wrongLength?: string
		},
		public datetime?: {
			earliest?: Date,
			latest?: Date,
			dateOnly?: boolean
			notValid?: string,
			tooEarly?: string,
			tooLate?: string
		},
		public equality?: {
			attribute?: string,
			message?: string,
			comparator?: any
		},
		public exclusion?: {
			within?: {},
			message?: string,
		},
		public format?: {
			pattern?: string,
			flags?: string,
			message?: string
		},
		public inclusion?: {
			within?: {},
			message?: boolean
		},
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
	    },
		public presence?: {
			allowEmpty?: boolean,
			message?: string
		},
	    public url?: {
			message?: string,
		    schemes?: string,
		    allowLocal?: boolean
	    }
	) {}
}

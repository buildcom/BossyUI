/*This is a slider widget created in angular as part of the BossyUI widgets.
 * The easiest way to use the slider is to include it in your HTML and then
 * create a tag <bossy-slider></bossy-slider>. This widget take in several
 * ways to customize. List of customizations available.
 * max              defaults to 100
 * min              defaults to 1
 * width            defaults to 250px
 * barfillcolor     defaults to darkgrey: must be passed as hexadecimal color format #000000
 * baremptycolor    defaults to lightgrey
 * buttoncolor      defaults to red
 * step             defaults to red
 * orientation      defaults to horizontal
 * ex.
 * <bossy-slider max="20" min="-5" orientation="vertical"></bossy-slider>*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {Component, OnInit} from 'angular2/core';

export interface  BossySliderConfig {
	max: number;
	min: number;
	width: any;
	barFillColor: any;
	barEmptyColor: any;
	buttonColor: any;
	step: any;
	orientation: any;

}

declare var __moduleName: string;

@Component({
	selector: 'bossy-slider',
	moduleId: __moduleName,
	templateUrl: '../templates/slider.html',
	inputs: ['config'],
	//styleUrls: ['app/components/_bossy-slider.css']
})

export class BossySlider implements OnInit {
	public config: BossySliderConfig;

	public max = 10;
	public value = 0;
	public min = 1;
	public fillWidth = 0;
	public emptWidth = 0;
	public barWidth = 250;
	public barPiece = 0;
	public step = 1;
	public isMouseDown = 0;
	public yCord = 0;
	public xCord = 0;
	public newXCord = 0;
	public newYCord = 0;
	public orientation = false;
	public butSize = 15;
	public barFillcolor = '#0000FF';
	public barEmptycolor = '#D3D3D3';
	public buttonColor = '#FF0000';

	ngOnInit() {
		this.config = {
			max: 10,
			min: 0,
			width: 100,
			barFillColor: '#0000FF',
			barEmptyColor: '#D3D3D3',
			buttonColor: '#0000FF',
			step: 1,
			orientation: 'horizontal',
		};
		this.barPiece = (this.barWidth / (this.max - this.min));
		this.makeBar();
	}

	/*makeBar()
	 * This creates the initial graphic of the slider and ensures it is in the correct order
	 * CC = 4 */
	makeBar() {
		//button should show up in the middle now or close to if uneven
		this.value = ((this.max + this.min) / 2);
		for (var current = this.min; current <= this.max; current++) {
			if (current < this.value) {
				this.fillWidth++;
			}
			if (current > this.value) {
				this.emptWidth++;
			}
		}
		//this.ngModel = this.value;
		return;
	};

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/*increase()
	 * This checks bounds when attempting to increase the value and moves the position
	 * of the slider button and updates the value.
	 * CC = 2*/
	increase() {
		if (this.value < this.max) {
			this.value = this.value + 1;
			this.fillWidth++;
			this.emptWidth--;
			//this.ngModel = this.value;
		}
		return;
	};

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/*butIncrease()
	 * This function allows the slider to increase in increments.
	 * CC = 1*/
	butIncrease() {
		var i = 0;
		for (i = 0; i < this.step; i++) {
			this.increase();
		}
		return;
	};

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/*decrease()
	 * This checks bounds when attempting to decrease the value and moves the position
	 * of the slider button and updates the value.
	 * CC = 2*/
	decrease() {
		if (this.value > this.min) {
			this.value = this.value - 1;
			this.fillWidth--;
			this.emptWidth++;
			//this.ngModel = this.value;
		}
		return;
	};

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/*butDecrease()
	 * This function allows the slider to decrease in increments
	 * CC = 1*/
	butDecrease() {
		var i = 0;
		for (i = 0; i < this.step; i++) {
			this.decrease();
		}
		return;
	};

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/*keyBind($event)
	 * This function is to bind the decrease and increase function with the arrow keys
	 * CC = 5*/
	keyBind(ev) {
		const pressed = ev.which;
		//If arrow key(Left or Down) is pressed then call the decrease() function to decrease the value.
		if (pressed === 37 || pressed === 40) {
			this.butDecrease();

		}
		//same as above but for Up or Right to increase the value.
		if (pressed === 38 || pressed === 39) {
			this.butIncrease();

		}
		return;
	};

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/*greyClick()
	 * This function is to allow the value to be changed when clicking on the bar
	 * CC = 1*/
	greyClick(event) {
		//When click on the empty bar the bar will increase
		this.butIncrease();

		return;
	};

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/*barClick()
	 * This function is to allow the value to be changed when clicking on the bar
	 * CC = 1*/
	barClick(event) {
		//When click on the Filled up color side the bar will decrease
		this.butDecrease();

		return;
	};

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/*drag($event)
	 * This function allows the button to drag by finding its location then checks it against its original location
	 * and if it is distance is greater than the size of a barpiece update the graphic and value
	 * CC = 9*/
	drag(event) {

		//grab the mouse location
		var x = event.clientX;
		var y = event.clientY;
		//check if the mouse is being held down
		if (this.isMouseDown) {
			//check the orientation
			if (this.orientation) {
				//if this is the first time you clicked down get ready to move it
				if (this.yCord === 0) {
					this.yCord = y;
				}
				else {
					//change the location of the slider after enough movement
					this.newYCord = y;
					while ((this.newYCord - this.yCord) > this.barPiece / 2) {
						this.yCord += this.barPiece;
						this.decrease();
					}
					while ((this.newYCord - this.yCord) < -(this.barPiece / 2)) {
						this.yCord -= this.barPiece;
						this.increase();
					}
				}
			}
			else {
				//if this is the first time you clicked down get ready to move it
				if (this.xCord === 0) {
					this.xCord = x;
				}
				else {
					//change the location of the slider after enough movement
					this.newXCord = x;
					while ((this.newXCord - this.xCord) > this.barPiece / 2) {
						this.xCord += this.barPiece;
						this.increase();
					}
					while ((this.newXCord - this.xCord) < -(this.barPiece / 2)) {
						this.xCord -= this.barPiece;
						this.decrease();
					}
				}
			}
		}
		return;
	};

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/*down()
	 * This function logs when the mouse is down
	 * CC = 1*/
	down() {
		this.newXCord = 0;
		this.xCord = 0;
		this.newYCord = 0;
		this.yCord = 0;
		this.isMouseDown = 1;
		return;
	};

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/*down()
	 * This function logs when the mouse is up
	 * CC = 1*/
	up() {
		this.newXCord = 0;
		this.xCord = 0;
		this.newYCord = 0;
		this.yCord = 0;
		this.isMouseDown = 0;
		return;
	};
}
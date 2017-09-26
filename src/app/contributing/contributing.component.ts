import { Component, OnInit } from '@angular/core';
import {students} from '../../data/studentContributors';
import {coreTeam} from '../../data/coreTeam';

@Component({
  selector: 'app-contributing',
  templateUrl: './contributing.component.html',
  styleUrls: ['./contributing.component.css']
})
export class ContributingComponent implements OnInit {
  studentContributors = students;
  teamMembers = coreTeam;
  constructor() { }

  ngOnInit() {
  }

}

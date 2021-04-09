import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

// Services
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css'],
})
export class NewReleasesComponent implements OnInit, OnDestroy {
  constructor(private dataService: MusicDataService) {}

  releases: Array<any>;
  private serviceSubscription: Subscription;

  ngOnInit(): void {
    this.serviceSubscription = this.dataService
      .getNewReleases()
      .subscribe((data) => (this.releases = data.albums.items));
  }

  ngOnDestroy(): void {
    this.serviceSubscription?.unsubscribe();
  }
}

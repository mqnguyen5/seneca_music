import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

// Services
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private dataService: MusicDataService
  ) {}

  results: any;
  searchQuery: any;
  private paramsSubscription: Subscription;

  ngOnInit(): void {
    this.paramsSubscription = this.route.queryParams.subscribe(
      (params: Params) => {
        this.searchQuery = params.q;
        this.dataService.searchArtists(this.searchQuery).subscribe((data) => {
          this.results = data.artists.items.filter(
            (element: any) => element.images.length > 0
          );
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
  }
}

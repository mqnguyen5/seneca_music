import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

// Services
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit, OnDestroy {
  constructor(private dataService: MusicDataService) {}

  favorites: Array<any>;
  private serviceSubscription: Subscription;

  removeFromFavorites(id: any) {
    this.serviceSubscription = this.dataService
      .removeFromFavourites(id)
      .subscribe((data) => (this.favorites = data.tracks));
  }

  ngOnInit(): void {
    this.serviceSubscription = this.dataService
      .getFavourites()
      .subscribe((data) => (this.favorites = data.tracks));
  }

  ngOnDestroy(): void {
    this.serviceSubscription?.unsubscribe();
  }
}

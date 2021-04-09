import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

// Services
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css'],
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private dataService: MusicDataService
  ) {}

  albums: any;
  artist: any;
  private paramsSubscription: Subscription;

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.dataService
        .getArtistById(params.id)
        .subscribe((data) => (this.artist = data));

      this.dataService.getAlbumsByArtistId(params.id).subscribe(
        (data) =>
          (this.albums = data.items.filter((element: any, index: any) => {
            return (
              data.items
                .map((album: any) => album.name)
                .indexOf(element.name) === index
            );
          }))
      );
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
  }
}

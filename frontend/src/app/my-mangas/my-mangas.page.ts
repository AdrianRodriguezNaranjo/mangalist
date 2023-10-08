import { Component, OnInit } from '@angular/core';
import { MymangasServiceService } from '../services/mymangas.service';
import { Route, Router } from '@angular/router';
import { IdtransportService } from '../services/idtransport.service';

@Component({
  selector: 'app-my-mangas',
  templateUrl: './my-mangas.page.html',
  styleUrls: ['./my-mangas.page.scss'],
})
export class MyMangasPage implements OnInit {

  userId!: number;
  mangaName!: String;
  mangaSynopsis!: String;
  mangaChapter!: number;
  mangas: any = []

  constructor(private mymangasService: MymangasServiceService, private idtransportService: IdtransportService, private router: Router) { }

  ngOnInit() {
    this.userId = this.setUserId();
    this.getAllMangas();
  }

  setUserId() {
    const userId = this.idtransportService.getUserId();
    return userId;
  }

  getAllMangas() {
    console.log(this.userId)
    this.mymangasService.getAll(this.userId).subscribe(response => {
      this.mangas = response;
    });
  }

  postManga() {
    if(this.mangaName && this.mangaChapter >= 1){
      this.mymangasService.post(this.mangaName, this.mangaSynopsis, this.mangaChapter, this.userId).subscribe(response => {
        this.getAllMangas();
      });
    }
  }

  deleteManga(idManga: any) {
    this.mymangasService.delete(idManga, this.userId).subscribe(response => {
      this.getAllMangas();
    });
  }

  updateManga(idManga: any) {
    this.mymangasService.put(this.userId, idManga, this.mangaName, this.mangaSynopsis, this.mangaChapter).subscribe(response => {
      this.getAllMangas();
    });
  }

  gotoHome() {
    this.router.navigateByUrl("/home");
  }
}

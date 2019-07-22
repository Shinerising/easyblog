import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ListComponent } from './list.component';
import { PostComponent } from './post.component';

import { FileNamePipe } from './pipe/filename.pipe';
import { SanitizehtmlPipe } from './pipe/sanitize.pipe';

import { GraphQLModule } from './graphql.module';

import { ConfigService } from './service/config.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    GraphQLModule
  ],
  declarations: [
    AppComponent,
    ListComponent,
    PostComponent,
    FileNamePipe,
    SanitizehtmlPipe
  ],
  providers: [
    ConfigService,
    { provide: APP_INITIALIZER, useFactory: (config: ConfigService) => () => config.loadConfig(), deps: [ConfigService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

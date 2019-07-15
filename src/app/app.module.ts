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

import { AppConfig } from './class/config.class';

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
    AppConfig,
    { provide: APP_INITIALIZER, useFactory: (config: AppConfig) => () => config.loadConfig(), deps: [AppConfig], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

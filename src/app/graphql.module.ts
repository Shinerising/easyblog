import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { NgModule } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

const uri = 'https://api.github.com/graphql';
export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({
      uri,
      headers: new HttpHeaders().set(
        'Authorization', 'Bearer ' + atob('Yjg5ZmNjZDZmMTI2MmVjZGE4ZmY' + 'zNzMzZGE2ODkzMWNiNzZkYjYyOQ'),
      )
    }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule { }

import {NgModule} from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {ApolloLink} from 'apollo-link';
import {InMemoryCache} from 'apollo-cache-inmemory';

const uri = 'https://api.github.com/graphql';
export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({
      uri,
      headers: new HttpHeaders().set(
          'Authorization', 'Bearer ' + atob('Yjg5ZmNjZDZmMTI2MmVjZGE4ZmY' + 'zNzMzZGE2ODkzMWNiNzZkYjYyOQ'),
        )}),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}

import * as React from 'react';
import * as pnp from 'sp-pnp-js';
import { css, SearchBox, Button, Panel, PanelType } from 'office-ui-fabric-react';
import styles from './SearchBar.module.scss';
import { ISearchBarProps } from './ISearchBarProps';

export default class SearchBar extends React.Component<ISearchBarProps, any> {
  constructor() {
    super();

    pnp.setup({
      headers: { Accept: 'application/json;odata=verbose' }
    });

    this.state = {
      showPanel: false,
      newValue: '',
      response: pnp.SearchResults
    };
  }
  public show(): void {
    this.setState({ showPanel: !this.state.showPanel });
  }
  public search(): void {
    let { newValue } = this.state;
    let query: pnp.SearchQuery = { Querytext: newValue || '*' }
    pnp.sp.search(query).then(this.resolve.bind(this))
  }
  public resolve(response: pnp.SearchResults): any {
    console.log(response);
    this.setState({
      response
    })
  }
  public render(): React.ReactElement<ISearchBarProps> {
    let { query, showPanel } = this.state;
    let { search, show } = this;
    return (
      <section>
        <SearchBox
          onChange={(newValue) => this.setState({ query: newValue })}
          onSearch={search.bind(this)}></SearchBox>
        <Button
          onClick={show.bind(this)}
          >Refine results</Button>
        <Panel
          isOpen={showPanel}
          headerText='Apply Filter'
          onDismiss={show.bind(this)}
          >
          <span>Content goes here</span>
        </Panel>
      </section>
    );
  }
}

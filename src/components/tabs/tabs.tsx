import React, { PureComponent } from 'react';
import styles from './tabs.scss';
import ArrowLeft from 'react-icons/lib/fa/angle-left';
import ArrowRight from 'react-icons/lib/fa/angle-right';
import autobind from 'autobind-decorator';

interface Item {
 name: string;
}
interface Props {
  items: Item[];
  selected: string;
  onSelect: (tab: any) => void;
}

export class TabsComponent extends PureComponent<Props> {
  private container: HTMLElement;
  private leftBtn: HTMLElement;
  private rightBtn: HTMLElement;
  private selectedRef: HTMLElement;

  private isInitiallyScrolled = false;

  public componentDidMount() {
    this.updateStyles();
    this.scrollToSelected();
  }

  public componentDidUpdate() {
    this.updateStyles();
    this.scrollToSelected();
  }

  private scrollToSelected() {
    if (!this.isInitiallyScrolled  && this.selectedRef) {
      this.isInitiallyScrolled = true;
      this.container.scrollLeft = this.selectedRef.offsetLeft - 40;
    }
  }

  @autobind
  private goLeft() {
    this.container.scrollLeft = this.container.scrollLeft - 60;
  }

  @autobind
  private goRight() {
    this.container.scrollLeft = this.container.scrollLeft + 60;
  }

  @autobind
  private setContainer(ref: HTMLElement) {
    this.container = ref;
  }

  @autobind
  private handleScroll() {
    this.updateStyles();
  }

  private updateStyles() {
    const el = this.container;

    const leftEnabled = el.scrollLeft > 0;
    const rightEnabled = (el.scrollLeft + el.clientWidth) < el.scrollWidth;

    this.rightBtn.classList.toggle(styles.navEnabled, rightEnabled);
    this.leftBtn.classList.toggle(styles.navEnabled, leftEnabled);
  }

  private isSelected(item: Item): boolean {
    return this.props.selected === item.name;
  }

  public render() {
    return <div className={styles.host}>
      <div className={styles.navBtn}
           ref={(ref) => this.leftBtn = ref}
           onClick={this.goLeft}>
        <ArrowLeft/>
      </div>
      <div className={styles.tabsWrap}
           ref={this.setContainer}
           onScroll={this.handleScroll}>
        {this.props.items.map((item) =>
          <button type='button'
                  className={this.isSelected(item) ? styles.selectedGroupTab : styles.groupTab}
                  ref={(ref) => this.isSelected(item) ? (this.selectedRef = ref) : null}
                  key={item.name}
                  onClick={() => this.props.onSelect(item)}>
            {item.name}
          </button>,
        )}
      </div>
      <div className={styles.navBtn}
           onClick={this.goRight}
           ref={(ref) => this.rightBtn = ref}>
        <ArrowRight/></div>
    </div>;
  }
}

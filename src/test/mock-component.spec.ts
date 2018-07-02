// tslint:disable: use-input-property-decorator use-output-property-decorator no-input-rename
// tslint:disable: no-output-rename
import { Component, EventEmitter, InjectionToken, Input, Output } from '@angular/core';
import { MockComponent } from './mock-component';

describe('MockComponent', () => {
  function getAnnotations(ComponentType: any): Component {
    return ComponentType['__annotations__'][0];
  }

  it('Should read selector annotation from provided component', () => {
    const selector = 'some-selector';

    @Component({
      selector,
    })
    class TestComponent {}

    const annotations = getAnnotations(MockComponent(TestComponent));
    expect(annotations.selector).toBe(selector);
  });

  it('Should read inputs and outputs provided by property annotation', () => {
    @Component({
      selector: 'some-selector',
    })
    class TestComponent {
      @Input() public firstInputProperty: any;
      @Input() public secondInputProperty: any;

      @Output() public firstOutputProperty: any;
      @Output() public secondOutputProperty: any;
    }

    const annotations = getAnnotations(MockComponent(TestComponent));
    expect(annotations).toMatchObject({
      inputs: ['firstInputProperty', 'secondInputProperty'],
      outputs: ['firstOutputProperty', 'secondOutputProperty'],
    });
  });

  it('Should read inputs and outputs provided by class annotation', () => {
    @Component({
      selector: 'some-selector',
      inputs: ['firstInputProperty', 'secondInputProperty'],
      outputs: ['firstOutputProperty', 'secondOutputProperty'],
    })
    class TestComponent {}

    const annotations = getAnnotations(MockComponent(TestComponent));
    expect(annotations).toMatchObject({
      inputs: ['firstInputProperty', 'secondInputProperty'],
      outputs: ['firstOutputProperty', 'secondOutputProperty'],
    });
  });

  it('Should merge inputs provided bu class and prop annotations', () => {
    @Component({
      selector: 'some-selector',
      inputs: ['firstInputProperty', 'secondInputProperty'],
      outputs: ['firstOutputProperty', 'secondOutputProperty'],
    })
    class TestComponent {
      @Input() public thirdInputProperty: any;
      @Output() public thirdOutputProperty: any;
    }

    const annotations = getAnnotations(MockComponent(TestComponent));
    expect(annotations).toMatchObject({
      inputs: ['firstInputProperty', 'secondInputProperty', 'thirdInputProperty'],
      outputs: ['firstOutputProperty', 'secondOutputProperty', 'thirdOutputProperty'],
    });
  });

  it('Should support renamed inputs and outputs', () => {
    @Component({
      selector: 'some-selector',
    })
    class TestComponent {
      @Input('directiveInputProperty') public bindingInputProperty: any;
      @Output('directiveOutputProperty') public bindingOutputProperty: any;
    }

    const annotations = getAnnotations(MockComponent(TestComponent));
    expect(annotations).toMatchObject({
      inputs: ['bindingInputProperty: directiveInputProperty'],
      outputs: ['bindingOutputProperty: directiveOutputProperty'],
    });
  });

  it('Should support components compiled with tsickle', () => {
    class TestComponent {
      public static decorators = [{ type: Component, args: [{ selector: 'some-selector' }] }];
      public static propDecorators: any = {
        inputProperty: [{ type: Input, args: [] }],
        outputProperty: [{ type: Output, args: [] }],
      };
    }

    const annotations = getAnnotations(MockComponent(TestComponent));
    expect(annotations).toMatchObject({
      selector: 'some-selector',
      inputs: ['inputProperty'],
      outputs: ['outputProperty'],
    });
  });

  it('Should support components with es5 API', () => {
    class TestComponent {
      public static annotations = [new Component({ selector: 'some-selector' })];
      public static propMetadata: any = {
        inputProperty: [new Input()],
        outputProperty: [new Output()],
      };
    }

    const annotations = getAnnotations(MockComponent(TestComponent));
    expect(annotations).toMatchObject({
      selector: 'some-selector',
      inputs: ['inputProperty'],
      outputs: ['outputProperty'],
    });
  });

  it('Should create event emitters for output properties', () => {
    @Component({
      selector: 'some-selector',
      outputs: ['firstOutputProperty'],
    })
    class TestComponent {
      @Output() public secondOutputProperty: any;
    }

    const component = new (MockComponent(TestComponent))();

    expect(component['firstOutputProperty']).toBeInstanceOf(EventEmitter);
    expect(component['secondOutputProperty']).toBeInstanceOf(EventEmitter);
  });

  it('Should not share same EventEmitters between instances', () => {
    @Component({
      selector: 'some-selector',
    })
    class TestComponent {
      @Output() public outputProperty: EventEmitter<any>;
    }

    const DecoratedComponent = MockComponent(TestComponent);
    expect(new DecoratedComponent().outputProperty)
      .not.toBe(new DecoratedComponent().outputProperty);
  });

  it('Should replace default template and providers to empty', () => {
    @Component({
      selector: 'some-selector',
      template: '<span></span>',
      providers: [{
        provide: new InjectionToken('test'),
        useValue: 'test',
      }],
    })
    class TestComponent {}

    const annotations = getAnnotations(MockComponent(TestComponent));
    expect(annotations.template).toBe('');
    expect(annotations.providers).toEqual([]);
  });

  it('Should allow redefine template', () => {
    @Component({
      selector: 'some-selector',
      template: '<span></span>',
    })
    class TestComponent {}

    const annotations = getAnnotations(MockComponent(TestComponent, '<div></div>'));
    expect(annotations.template).toBe('<div></div>');
  });
});

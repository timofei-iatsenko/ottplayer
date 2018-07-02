import {
  Component,
  EventEmitter,
  Type,
  ɵReflectionCapabilities,
} from '@angular/core';

const reflector = new ɵReflectionCapabilities();

function getPropertyName(property: string, propMetadata: any) {
  if (propMetadata.bindingPropertyName) {
    return `${property}: ${propMetadata.bindingPropertyName}`;
  }

  return property;
}

/**
 * Function to create Mocked version of components for tests instead of real ones
 *
 *  Example:
 *  ```
 *  TestBed.configureTestingModule({
 *     declarations: [
 *       MockComponent(TimeUtcOffsetDatepickerComponent),
 *       MockComponent(PanelWarningComponent),
 *     ],
 *   });
 * ```
 * That code will create mocked version of provided components.
 * Than you can find it in your tests, and fire event emitters, check bound properties and etc.
 *
 * Example:
 * ```
 * const datePicker = fixture.debugElement.query(By.css('time-utc-offset-datepicker'));
 * datePicker.onDateSelect.emit()
 * ```
 */
export function MockComponent<T extends Type<any>>(ComponentType: T | Component, template = ''): T {
  let metadata: Component;
  if (ComponentType instanceof Type) {

    const annotations = reflector.annotations(ComponentType);
    const componentMetadata: Component = annotations.find((a) => a.ngMetadataName === 'Component') as Component || {};

    const propsMetadata = reflector.propMetadata(ComponentType);

    const inputs = componentMetadata.inputs || [];
    const outputs = componentMetadata.outputs || [];

    Object.keys(propsMetadata).forEach((propName) => {
      const input = propsMetadata[propName].find((a) => a.ngMetadataName === 'Input');
      const output = propsMetadata[propName].find((a) => a.ngMetadataName === 'Output');

      if (input) {
        inputs.push(getPropertyName(propName, input));
      }

      if (output) {
        outputs.push(getPropertyName(propName, output));
      }
    });

    metadata = {
      ...componentMetadata,
      template,
      providers: [],
      inputs,
      outputs,
    };

  } else {
    metadata = {
      selector: ComponentType.selector,
      template: ComponentType.template || '',
      inputs: ComponentType.inputs,
      outputs: ComponentType.outputs || [],
    };
  }
  // tslint:disable-next-line no-shadowed-variable
  return Component(metadata)(class MockComponent {
    constructor() {
      if (metadata.outputs) {
        metadata.outputs.forEach((method) => {
          this[method] = new EventEmitter<any>();
        });
      }
    }
  } as any);
}

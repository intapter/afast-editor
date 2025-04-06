import { dialog, Dialog, DialogPlugin } from 'tdesign-react';
import { requireData } from '../../../apis/base';
import { useLanguage } from 'afast-boot';
import {
  createChildElement,
  deleteElement,
  searchElement as search,
  updateElementConfig,
} from '../../../apis/element';

export default class {
  constructor(context) {
    this.context = context;
  }

  onElementMenuClick(action, element) {
    switch (action.value) {
      case 'create': {
        this.context.fields.elementName = '';
        this.searchElement('');
        this.context.fields.createChildElementTo = element.id;
        break;
      }
      case 'delete': {
        if (confirm(useLanguage('deleteElementConfirmMessage'))) {
          requireData(
            deleteElement(
              this.context.props.projectId,
              this.context.props.pageName,
              element.id,
            ),
          ).then(() => {
            this.context.fields.createChildElementTo = undefined;
            this.context.dispatch('onUpdate');
          });
        }
      }
    }
  }

  handleCreateElement(elementId, name) {
    console.log(elementId, name);
    requireData(
      createChildElement({
        projectId: this.context.props.projectId,
        pageName: this.context.props.pageName,
        id: elementId,
        name,
      }),
    ).then((res) => {
      this.context.fields.createChildElementTo = undefined;
      this.context.dispatch('onUpdate');
    });
  }

  searchElement(keyword) {
    requireData(search(this.context.props.projectId, keyword)).then((data) => {
      this.context.fields.elementList = (data || []).map((name) => {
        return {
          label: name,
          value: name,
        };
      });
    });
  }

  updateElement(name) {
    const element = this.context.fields.element;
    const value = this.context.fields.newElement[name];
    requireData(updateElementConfig(
      this.context.props.projectId,
      this.context.props.pageName,
      element.id,
      name,
      value,
    )).then((data) => {
      this.context.dispatch('onUpdate');
      this.context.fields.element = data
    });
  }
}

import { requireData } from '../../../apis/base';
import {
  createChildElemet,
  searchElement as search,
} from '../../../apis/element';

export default class {
  constructor(context) {
    this.context = context;
  }

  onElementMenuClick(action, element) {
    switch (action.value) {
      case 'create': {
        this.context.fields.elementName = ''
        this.searchElement("")
        this.context.fields.createChildElementTo = element.id;
      }
    }
  }

  handleCreateElement(elementId, name) {
    console.log(elementId, name);
    requireData(
      createChildElemet({
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
}

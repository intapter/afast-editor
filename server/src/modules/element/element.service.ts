import { Injectable } from '@nestjs/common';
import { PageService } from '../page/page.service';
import { randomUUID, UUID } from 'crypto';
import { ProjectService } from '../project/project.service';
const HTML_ELE_TAGS = new Set([
  'a',
  'b',
  'div',
  'span',
  'p',
  'strong',
  'u',
  'abbr',
  'address',
  'area',
  'article',
  'aside',
  'audio',
  'base',
  'bdi',
  'bdo',
  'blockquote',
  'body',
  'br',
  'button',
  'canvas',
  'caption',
  'cite',
  'code',
  'col',
  'colgroup',
  'data',
  'datalist',
  'dd',
  'del',
  'details',
  'dfn',
  'dialog',
  'dl',
  'dt',
  'em',
  'embed',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hr',
  'html',
  'i',
  'iframe',
  'img',
  'input',
  'ins',
  'kbd',
  'label',
  'legend',
  'li',
  'link',
  'main',
  'map',
  'mark',
  'meta',
  'meter',
  'nav',
  'noscript',
  'object',
  'ol',
  'optgroup',
  'option',
  'output',
  'picture',
  'pre',
  'progress',
  'q',
  'rp',
  'rt',
  'ruby',
  's',
  'samp',
  'script',
  'section',
  'select',
  'small',
  'source',
  'style',
  'sub',
  'summary',
  'sup',
  'table',
  'tbody',
  'td',
  'template',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'title',
  'tr',
  'track',
  'ul',
  'var',
  'video',
  'wbr',
]);

const searchElementParent: (element: PageElement, id: UUID) => PageElement | null = (
  element,
  id,
) => {
  if (!element) return null;
  if (!element.children) return null;
  for (let i = 0; i < element.children.length; i++) {
    if(element.children[i] && element.children[i].id === id){
      return element
    }
    const e = searchElementParent(element.children[i], id);
    if (e !== null) return e;
  }
  return null;
};

const searchElement: (element: PageElement, id: UUID) => PageElement | null = (
  element,
  id,
) => {
  if (!element) return null;
  if (element.id === id) return element;
  if (!element.children) return null;
  for (let i = 0; i < element.children.length; i++) {
    const e = searchElement(element.children[i], id);
    if (e !== null) return e;
  }
  return null;
};

@Injectable()
export class ElementService {
  constructor(
    private readonly pageService: PageService,
    private readonly projectService: ProjectService,
  ) {}

  delete(projectId: UUID, pageName: UUID, id: UUID) {
    const pageDetail = this.pageService.detail(projectId, pageName);
    const parent = searchElementParent(pageDetail.view, id);
    if(!parent || !parent.children) throw new Error('Unknown element')
    parent.children = parent.children.filter((c) => {
      return c.id !== id
    })
    this.pageService.update(
      projectId,
      pageName,
      pageDetail,
    );
    return parent
  }

  update(updateElementDto: UpdateElementDto){
    const pageDetail = this.pageService.detail(
      updateElementDto.projectId,
      updateElementDto.pageName,
    );
    const element = searchElement(pageDetail.view, updateElementDto.id);
    (element as any)[updateElementDto.configName] = updateElementDto.value
    this.pageService.update(
      updateElementDto.projectId,
      updateElementDto.pageName,
      pageDetail,
    );
    return element
  }

  list(id: UUID, keyword: string) {
    let list = [...HTML_ELE_TAGS];
    const projectInfo = this.projectService.detail(id);
    if (projectInfo.views) {
      list.push(...Object.keys(projectInfo.views));
    }
    if (keyword) {
      list = list.filter((view) => {
        return view.indexOf(keyword) !== -1;
      });
    }
    return list.sort();
  }

  createElementTo(createElementDto: CreateElementDto): ElementInfo {
    const pageDetail = this.pageService.detail(
      createElementDto.projectId,
      createElementDto.pageName,
    );
    const element = searchElement(pageDetail.view, createElementDto.id);
    if (!element) {
      throw new Error(`Element \`${createElementDto.id}\` is not found`);
    }
    if (!element.children) element.children = [];
    element.children.push({
      id: randomUUID(),
      name: createElementDto.name,
    });
    this.pageService.update(
      createElementDto.projectId,
      createElementDto.pageName,
      pageDetail,
    );
    return element;
  }
}

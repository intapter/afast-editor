import { requireData } from "@/apis/base"
import { getPageDetail } from "../../../apis/page"

export default class{
  constructor(context){
    this.context = context
  }
  
  onPageSelect(page){
    const searchParams = this.context.fields.searchParams
    requireData(getPageDetail(searchParams.get('id'),page.name)).then((data) => {
      this.context.fields.pageInfo = data
    })
  }
}
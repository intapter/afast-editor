import { requireData } from "@/apis/base"
import { getProjectDetail } from "@/apis/project"

export default class{
  constructor(context){
    this.context = context
  }
  onMounted(){
    const searchParams = this.context.fields.searchParams    
    requireData(getProjectDetail(searchParams.get('id'))).then((data) => {
      this.context.fields.projectName = data.name
      this.context.fields.pageList = Object.keys(data.routes).map((key) => {
        const route = data.routes[key]
        return {
          name: key,
          path: route.path
        }
      })
    })
  }
}
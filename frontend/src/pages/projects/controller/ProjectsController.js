import { getProjectList } from "@/apis/project";
import { requireData } from '@/apis/base';

export default class{
    constructor(context){
        this.context = context;
    }
    onMounted(){
        requireData(getProjectList()).then(data => {
            this.context.fields.projects = data
        })
    }
}
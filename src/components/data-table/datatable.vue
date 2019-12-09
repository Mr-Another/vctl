<template>
    <div>
        <blue-table
        :datas="tabledatas"
        ></blue-table>
    </div>
</template>

<script>
import blueButton from '../button/button'
import blueFrom from '../form/form'
import blueTable from '../table/table'
import bluePagination from '../pagination/pagination'
export default {
    name:'blue-datatable',
    components:{blueButton,blueFrom,blueTable},
    data(){
        return {
           tabledatas:[]
        }
    }
}
</script>
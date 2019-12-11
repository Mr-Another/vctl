<template>
	<th
		:class="[cls,filter? 'blue-select-thead': '']"
		@click="triggerSort()"
		:rowspan="rowspan"
		:colspan="colspan"
	>
		<div class="blue-select-th" v-if="filter">
			<div ref="labelSelect" class="blue-select-th-title" @click="ifshowcheck">
				<span>{{title}}</span>
				<i class="icon-down"></i>
			</div>
			<transition name="fade">
				<div ref="labelcheck" class="blue-select-th-check" v-show="showcheck">
					<Checkbox v-model="checkval" :datas="filterKey">
						<template slot="item" slot-scope="{item}">
							<span>{{item.key}}</span>
						</template>
					</Checkbox>
					<div class="blue-select-th-check-btn">
						<blue-button class="blue-btn" text @click="choose">筛选</blue-button>
						<blue-button class="blue-btn" text @click="selectReset">重置</blue-button>
					</div>
				</div>
			</transition>
		</div>
		<template v-else>
			<div
				v-tooltip="tooltipParam.enable"
				:placement="tooltipParam.placement"
				:content="tooltipParam.content || title"
			>
				<span>{{title}}</span>
				<span class="blue-table-sort-handler" v-if="sort">
					<span
						class="blue-table-sort-asc"
						v-if="sortStatus.type == 'asc' && sortStatus.prop == sortUseProp"
						:class="{'blue-table-sort-selected sort-selected': sortStatus.type == 'asc' && sortStatus.prop == sortUseProp}"
					>
						<i class="icon-top"></i>
					</span>
					<span
						class="blue-table-sort-desc"
						v-else
						:class="{'blue-table-sort-selected sort-selected': sortStatus.type == 'desc' && sortStatus.prop == sortUseProp}"
					>
						<i class="icon-down"></i>
					</span>
				</span>
			</div>
		</template>
	</th>
</template>

<script>
import utils from '@/src/utils/utils'
import Checkbox from '@/src/components/checkbox'
import blueSelect from '@/src/components/select/select'
import { type } from 'os'
import colors from '../../../themes/var'
export default {
	name: 'blueTableTh',
	props: {
		rowspan: Number,
		colspan: Number,
		title: String,
		width: Number,
		className: String,
		fixed: String,
		label: String,
		prop: String,
		dict: String,
		align: String,
		render: Function,
		unit: String,
		tooltip: {
			type: [Boolean, Object],
			default: false
		},
		sortProp: String,
		sort: {
			type: [Boolean, String],
			default: false
		},
		sortStatus: {
			type: Object,
			default: () => ({ type: null, prop: null })
		},
		placement: String,
		content: String,
		filter: {
			type: Boolean,
			default: false
		},
		filterKey: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			checkval: null,
			showcheck: false
		}
	},
	methods: {
		triggerSort() {
			if (!this.sort) return false
			let sortStatus = utils.copy(this.sortStatus)
			if (
				this.sortStatus.type &&
				this.sortStatus.prop == this.sortUseProp
			) {
				sortStatus.type = this.sortStatus.type == 'asc' ? 'desc' : 'asc'
			} else {
				sortStatus.type = 'desc'
				sortStatus.prop = this.sortUseProp
			}
			let parent = this.$parent
			if (
				parent.$options._componentTag == 'Table' ||
				parent.$options._componentTag == 'blue-table'
			) {
				parent.triggerSort(sortStatus, this.sort)
			}
		},
		ifshowcheck() {
			this.showcheck = !this.showcheck
		},
		selectReset() {
			this.checkval = null
			this.$emit('transformData', this.checkval)
			this.showcheck = false
		},
		choose() {
			this.$emit('transformData', this.checkval)
			this.showcheck = false
		}
	},
	computed: {
		tooltipParam() {
			if (this.tooltip === true) {
				return {
					enable: true,
					content: this.content,
					placement: this.placement
				}
			} else if (utils.isObject(this.tooltip)) {
				return {
					enable: true,
					content: this.tooltip.content,
					placement: this.tooltip.placement
				}
			}
			return {
				enable: false
			}
		},
		cls() {
			return {
				[`text-${this.align}`]: !!this.align,
				[this.className]: !!this.className,
				pointer: this.sort
			}
		},
		sortUseProp() {
			return this.sortProp || this.prop
		}
	},
	watch: {
		checkval(n) {
			if (n && n.length != 0) {
				this.$refs.labelSelect.style.color = colors['primary-color']
			} else {
				this.$refs.labelSelect.style.color = ''
			}
		}
	}
}
</script>

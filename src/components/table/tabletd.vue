<template>
	<td :class="cls">
		<template v-if="prop || render">
			<template v-if="compName">
				<component :rowData="data" :field="this.data[this.prop]" :index="index" :is="compName"></component>
			</template>
			<template v-else>{{show}}</template>
		</template>
		<slot :data="data" :index="index"></slot>
	</td>
</template>
<script>
import config from '@/src/utils/config'

export default {
	name: 'blueTableTd',
	props: {
		index: Number,
		prop: String,
		dict: String,
		data: [Object, Array],
		align: String,
		unit: String,
		render: Function,
		compName: String,
		className: String
	},
	data() {
		return {}
	},
	computed: {
		cls() {
			return {
				[`text-${this.align}`]: !!this.align,
				[this.className]: !!this.className
			}
		},
		show() {
			if (this.prop == '$index') return this.index
			if (this.render) {
				return this.render.call(null, this.data)
			}
			let value = this.data[this.prop]
			if (this.dict) {
				return config.dictMapping(value, this.dict)
			}
			if (this.unit) {
				return value === '' || value === null || value === undefined
					? ''
					: `${value}${this.unit}`
			}
			return value
		}
	}
}
</script>

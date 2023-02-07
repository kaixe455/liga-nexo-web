export function sortByProperty (property) {
	return function (a, b) {
		if (a[property] > b[property]) { return 1 } else if (a[property] < b[property]) { return -1 }

		return 0
	}
}

export const processDateString = (dateString) => {
	const [date, month, year] = dateString.split(/\//g).map(Number)
	return new Date(year, month - 1, date)
}

export const findClosest = (data, accessor, target = Date.now()) =>
	data.reduce((prev, curr) => {
		const a = Math.abs(accessor(curr).getTime() - target)
		const b = Math.abs(accessor(prev).getTime() - target)
		return a - b < 0 ? curr : prev
	})

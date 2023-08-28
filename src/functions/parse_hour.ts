export function parseTimeToDateTime(timeString: string): Date {
	const baseDate = new Date(); // Any date will do, as we're only interested in the time part
	const [hours, minutes] = timeString.split(':').map(Number);

	if (isNaN(hours) || isNaN(minutes)) {
		return new Date(Date.now());
	}

	baseDate.setHours(hours);
	baseDate.setMinutes(minutes);

	return baseDate;
}

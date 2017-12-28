const events = {
  CONNECT: 'connect',
  REGIONS_SAVE_AFTER: 'regions.save.after',
  REGIONS_REMOVE_AFTER: 'regions.remove.after',
  COLLECTIONS_SAVE_AFTER: 'collections.save.after',
  COLLECTIONS_SAVE_AFTER_NAME: 'collections.save.after.%s',
  COLLECTIONS_REMOVE_AFTER: 'collections.remove.after',
  COLLECTIONS_PREVIEW: 'cockpit:collections.preview',
};

const isValid = (eventName) => {
  if (!eventName) return false;
  if (Object.values(events).includes(eventName)) return true;

  const eventsWithName = Object.values(events)
    .filter(x => x.includes('.%s'))
    .map(x => x.replace('.%s', ''));

  return eventsWithName.includes(eventName
    .split('.')
    .slice(0, -1)
    .join('.'));
};

module.exports = {
  events,
  isValid,
};

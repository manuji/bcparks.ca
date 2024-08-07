module.exports = {
  indexPark: async function (id) {
    if (!id) {
      return;
    }
    const exists = (await strapi.entityService.findMany('api::queued-task.queued-task', {
      filters: {
        action: 'elastic index park',
        numericData: id
      }
    })).length > 0;
    if (!exists) {
      strapi.log.info(`queued protectedArea ${id} for reindexing`)
      try {
        await strapi.entityService.create('api::queued-task.queued-task', {
          data: {
            action: 'elastic index park',
            numericData: id
          }
        })
      } catch (error) {
        strapi.log.error(error);
      }
    }
  },
  removePark: async function (id) {
    if (!id) {
      return;
    }
    const exists = (await strapi.entityService.findMany('api::queued-task.queued-task', {
      filters: {
        action: 'elastic remove park',
        numericData: id
      }
    })).length > 0;
    if (!exists) {
      strapi.log.info(`queued protectedArea ${id} for removal`)
      try {
        await strapi.entityService.create('api::queued-task.queued-task', {
          data: {
            action: 'elastic remove park',
            numericData: id
          }
        })
      } catch (error) {
        strapi.log.error(error);
      }
    }
  },
  queueAdvisoryEmail: async function (subject, title, advisoryNumber, triggerInfo) {
    if (!subject || !title || !advisoryNumber) {
      return;
    }
    const exists = (await strapi.entityService.findMany('api::queued-task.queued-task', {
      filters: {
        action: 'email advisory',
        numericData: advisoryNumber
      }
    })).length > 0;
    if (!exists) {
      strapi.log.info(`queued advisoryNumber ${advisoryNumber} for "${subject}" notification`)
      try {
        await strapi.entityService.create('api::queued-task.queued-task', {
          data: {
            action: 'email advisory',
            numericData: advisoryNumber,
            jsonData: {
              "subject": subject,
              "title": title,
              "advisoryNumber": advisoryNumber,
              "triggeredBy": triggerInfo
            }
          }
        })
      } catch (error) {
        strapi.log.error(error);
      }
    }
  }
}
function objectAssign(defaultSettings, userSettings) {
  for (let key in defaultSettings) {
    if (userSettings[key] !== undefined) {
      if (typeof defaultSettings[key] === "object" && typeof userSettings[key] === "object") {
        objectAssign(defaultSettings[key], userSettings[key])
      }else {
        defaultSettings[key] = userSettings[key];
      }
    }
  }

  for (key in userSettings) {
    if (typeof defaultSettings[key] === "object" && typeof userSettings[key] === "object") {
      objectAssign(defaultSettings[key], userSettings[key])
    }else {
      defaultSettings[key] = userSettings[key];
    }
  }

  return defaultSettings;
}

exports.objectAssign = objectAssign;
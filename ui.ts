import { PropertiesVarService } from './service/PropertiesVarService'
import { InstallOptionsType } from './constructors/types'

export default {
  install (app: any, options: InstallOptionsType) {
    // app.config.globalProperties.$theme = useTheme(options?.theme, options?.options)
    // app.config.globalProperties.$translate = Translation

    PropertiesVarService.addMain(options.designs || [])
    console.log('options', options)
  }
}

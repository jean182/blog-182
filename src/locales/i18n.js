import i18n from "i18n-js"
import en from "./en.json"
import es from "./es.json"
import fr from "./fr.json"
import it from "./it.json"
import pt from "./pt.json"

i18n.defaultLocale = "en"
i18n.locale = "en"
i18n.fallbacks = true
i18n.translations = { en, es, fr, it, pt }

export default i18n

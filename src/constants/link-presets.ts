import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import { LinkPreset, type NavBarLink } from "@/types/config";

export const LinkPresets: { [key in LinkPreset]: NavBarLink } = {
	[LinkPreset.Home]: {
		name: i18n(I18nKey.home),
		nameEn: "Home",
		url: "/",
	},
	[LinkPreset.About]: {
		name: i18n(I18nKey.about),
		nameEn: "About",
		url: "/about/",
	},
	[LinkPreset.Archive]: {
		name: i18n(I18nKey.archive),
		nameEn: "Archive",
		url: "/archive/",
	},
};

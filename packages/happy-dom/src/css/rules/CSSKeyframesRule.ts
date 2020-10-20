import CSSRule from '../CSSRule';
import CSSStyleDeclarationFactory from '../CSSStyleDeclarationFactory';
import CSSKeyframeRule from './CSSKeyframeRule';

const CSS_RULE_REGEXP = /([^{]+){([^}]+)}/;

/**
 * CSSRule interface.
 */
export default class CSSKeyframesRule extends CSSRule {
	public readonly type = CSSRule.KEYFRAMES_RULE;
	public readonly cssRules: CSSKeyframeRule[] = [];
	public readonly name: string = null;

	/**
	 * Returns css text.
	 *
	 * @returns CSS text.
	 */
	public get cssText(): string {
		let cssText = '';
		for (const cssRule of this.cssRules) {
			cssText += cssRule.cssText + ' ';
		}
		return `@keyframes ${this.name} { ${cssText}}`;
	}

	/**
	 * Appends a rule.
	 *
	 * @param rule Rule. E.g. "0% { transform: rotate(360deg); }".
	 */
	public appendRule(rule: string): void {
		const match = rule.match(CSS_RULE_REGEXP);
		if (match) {
			const cssRule = new CSSKeyframeRule();
			cssRule.parentRule = this;
			// @ts-ignore
			cssRule.keyText = match[1].trim();
			// @ts-ignore
			cssRule.style = CSSStyleDeclarationFactory.createCSSStyleDeclaration(match[2].trim(), this);
		}
	}

	/**
	 * Removes a rule.
	 *
	 * @param rule Rule. E.g. "0%".
	 */
	public deleteRule(rule: string): void {
		for (let i = 0, max = this.cssRules.length; i < max; i++) {
			if (this.cssRules[i].keyText === rule) {
				this.cssRules.splice(i, 1);
				break;
			}
		}
	}
}

import {
  Vue,
  Ref,
  Prop,
  Component,
} from 'vue-property-decorator';
import {
  ElementInterface,
  SettingsTourInterface,
  TextPropertiesInterface,
  TypeTransitionInterface,
  MaskPropertiesInterface,
  SizePropertiesInterface,
  ScenarioPropertiesInterface,
  ContextSizeStrategyInterface,
  ContextVelocityStrategyInterface,
} from '@/support/interfaces';
import {
  hScrollTo,
  hLoadImage,
  hGetScollPosition,
  hGetElementAbsolutePosition,
} from '@/support/utils';
import ContextSizeStrategy from '@/support/strategySize';
import ContextVelocityStrategy from '@/support/strategyVelocity';
import AnimTourTooltip from '@/components/AnimTour/AnimTourTooltip/index.vue';
import AnimTourTimeLine from '@/components/AnimTour/AnimTourTimeLine/index.vue';

/**
* AnimTour
* Main component for anim tour.
*
* @author Przemysław Drzewicki <przemyslaw.drzewicki@gmail.com>
*/
@Component({
  components: {
    AnimTourTooltip,
    AnimTourTimeLine,
  },
})
export default class AnimTour extends Vue {
  /**
   * @var Array<ScenarioProperties>
   */
  @Prop({ type: Array, default: [] })
  public scenario!: Array<ScenarioPropertiesInterface>;

  /**
   * @var Boolean
   */
  @Prop({ type: Boolean, default: true })
  public isMapVisible: boolean;

  /**
   * @var String
   */
  @Prop({ type: String, default: '#1890ff' })
  public color: string;

  /**
   * @var TextProperties
   */
  @Prop({
    type: Object,
    default: () => ({
      next: 'Next',
      finish: 'End tour',
      previous: 'Previous',
    }),
  })
  public texts: TextPropertiesInterface;

  /**
   * @var boolean
   */
  public isToolTipVisible: boolean;

  /**
   * @var ScenarioProperties
   */
  public currentStep: ScenarioPropertiesInterface|null = null;

  /**
   * @var number
   */
  public currentStepNumber: number|null = 0;

  /**
   * @var MaskProperties
   */
  public maskProperties: MaskPropertiesInterface = {
    position: {
      x: 0,
      y: 0,
    },
    size: {
      width: 10,
      height: 10,
    },
    steps: 20,
    padding: 10,
  };

  /**
   * @var DOMTokenList|undefined
   */
  private classList?: DOMTokenList|undefined;

  /**
   * @var CSSStyleDeclaration|undefined
   */
  private style?: CSSStyleDeclaration|undefined;

  /**
   * @var ContextVelocityStrategy
   */
  private strategyVelocity: ContextVelocityStrategyInterface;

  /**
   * @var ContextSizeStrategy
   */
  private strategySize: ContextSizeStrategyInterface;

  /**
   * @var number
   */
  private timeout: number;

  /**
   * @var number
   */
  private settingsAnimTour: SettingsTourInterface = {
    durationCallback: 300,
    isToolTipVisible: false,
  }

  /**
   * @var AnimTour
   */
  @Ref() readonly animTourInstance!: this;

  /**
   * Method fired when component mounted.
   */
  public mounted(): void {
    this.strategySize = new ContextSizeStrategy();
    this.strategyVelocity = new ContextVelocityStrategy();
  }

  /**
   * Method computed to get scenario with id.
   * @return Array<ScenarioProperties>
   */
  public get getScenarioWhitId(): Array<ScenarioPropertiesInterface> {
    return this.scenario.map((step) => {
      const stepCopy = step;
      stepCopy.id = `step_${Math.random()}`;
      return stepCopy;
    });
  }

  /**
   * Method computed to get current mask properties.
   * @return string
   */
  public get getMaskProperties(): string {
    return `M0,0 L${window.innerWidth},
    0 L${window.innerWidth},
    ${window.innerHeight} L0,
    ${window.innerHeight}z M${this.maskProperties.position.x}, 
    ${this.maskProperties.position.y} l 0,
    ${this.maskProperties.size.height}  ${this.maskProperties.size.width},
    0  0,
    -${this.maskProperties.size.height < 0 ? 0 : this.maskProperties.size.height}Z`;
  }

  /**
   * Method to start tour.
   * @param state: boolean
   * @return Promise<void>
   */
  public async startTour(step: number): Promise<void> {
    if (!this.scenario[step || 0]) {
      this.stopTour();
      throw new Error(`The given step: '${step}' does not exist in the scenario.`);
    }
    this.currentStepNumber = step || 0;
    this.currentStep = this.scenario[step || 0];
    this.settingsAnimTour.isToolTipVisible = false;

    if (this.currentStep.before) {
      await this.handleCallback('before');
    }

    await this.sizeTo({
      ...this.maskProperties,
      steps: 25,
      size: {
        width: 10,
        height: 10,
      } as SizePropertiesInterface,
    } as MaskPropertiesInterface);
    const properties = await this.getElementProperties(
      document.querySelector(this.currentStep.selector),
      this.currentStep.selector,
    );

    this.toogleTourVisible(true);
    await this.transitionTo(properties);
    await this.sizeTo(properties);
    this.settingsAnimTour.isToolTipVisible = true;

    if (this.currentStep.after) {
      await this.handleCallback('after');
    }
  }

  /**
   * Method to handle callback step scenario.
   * @param type: string
   * @return Promise<() => void>
   */
  private handleCallback(type: string): Promise<() => void> {
    return new Promise((resolve) => {
      if (type === 'after') {
        this.currentStep[type]();
      }
      if (type === 'before') {
        this.currentStep[type]();
      }
      setTimeout(() => resolve(), this.settingsAnimTour.durationCallback);
    });
  }

  /**
   * Method to change step tour.
   * @param step: number
   */
  public setStep(step: number): void {
    this.currentStepNumber = step;
    this.startTour(this.currentStepNumber);
  }

  /**
   * Method to change step tour.
   * @param state: string
   */
  public changeStepTour(state: string): void {
    this.currentStepNumber = state === 'next'
      ? this.currentStepNumber + 1 : this.currentStepNumber - 1;
    this.startTour(this.currentStepNumber);
  }

  /**
   * Method to stopTour.
   */
  public stopTour(): void {
    hScrollTo({ offsetTop: 0 } as ElementInterface, () => {
      this.settingsAnimTour.isToolTipVisible = false;
      this.toogleTourVisible(false);
      this.currentStepNumber = 0;
    });
  }

  /**
   * Method to sizeTo.
   * @param properties: MaskProperties
   * @return Promise<void>
   */
  private sizeTo(properties: MaskPropertiesInterface): Promise<void> {
    const type: TypeTransitionInterface = {
      x: properties.size.width > this.maskProperties.size.width ? 'right' : 'left',
      y: properties.size.height > this.maskProperties.size.height ? 'bottom' : 'top',
    };
    this.strategySize.setStrtegy(`${type.x}-${type.y}`);
    return new Promise((resolve) => this.size(properties, resolve));
  }

  /**
   * Method to set velocity movment.
   * @param properties: MaskProperties
   * @param type: TypeTransition
   * @param resolve: (value?: void | PromiseLike<void>) => void
   */
  private size(
    properties: MaskPropertiesInterface,
    resolve: (value?: void | PromiseLike<void>) => void,
  ): void {
    const response = this.strategySize.handle(
      this.maskProperties.size,
      properties.size,
      this.maskProperties.steps,
      resolve,
    );
    this.maskProperties.size = response.size;
    if (!response.end) {
      this.timeout = setTimeout(() => this.size(properties, resolve), 1);
    } else {
      clearTimeout(this.timeout);
    }
  }

  /**
   * Method to transitionTo
   * @param properties: MaskProperties
   * @return Promise<void>
   */
  private transitionTo(properties: MaskPropertiesInterface): Promise<void> {
    const type: TypeTransitionInterface = {
      x: properties.position.x > this.maskProperties.position.x ? 'right' : 'left',
      y: properties.position.y > this.maskProperties.position.y ? 'bottom' : 'top',
    };
    this.strategyVelocity.setStrtegy(`${type.x}-${type.y}`);
    return new Promise((resolve) => this.velocity(properties, resolve));
  }

  /**
   * Method to set velocity movment.
   * @param properties: MaskProperties
   * @param type: TypeTransition
   * @param resolve: (value?: void | PromiseLike<void>) => void
   */
  private velocity(
    properties: MaskPropertiesInterface,
    resolve: (value?: void | PromiseLike<void>) => void,
  ): void {
    const response = this.strategyVelocity.handle(
      this.maskProperties.position,
      properties.position,
      this.maskProperties.steps,
      resolve,
    );
    this.maskProperties.position = response.position;
    if (!response.end) {
      this.timeout = setTimeout(() => this.velocity(properties, resolve), 1);
    } else {
      clearTimeout(this.timeout);
    }
  }

  /**
   * Method to toogle tour visible.
   * @param state: boolean
   */
  private toogleTourVisible(state: boolean): void {
    document.body.style.overflow = state ? 'hidden' : 'auto';
    this.animTourInstance.style.display = state ? 'block' : 'none';
    this.animTourInstance.classList[state ? 'add' : 'remove']('AnimTourFadeIn');
  }

  /**
   * Method to set mask properties.
   * @param boundingClientRect: DOMRect
   * @param element: ElementProperties|null = null
   * @return MaskProperties
   */
  private setMaskProperties(
    boundingClientRect: DOMRect,
    element: ElementInterface|null = null,
  ): MaskPropertiesInterface {
    return {
      ...this.maskProperties,
      size: {
        width: boundingClientRect.width + this.maskProperties.padding * 2,
        height: boundingClientRect.height + this.maskProperties.padding * 2,
      },
      position: {
        x: boundingClientRect.x - this.maskProperties.padding,
        y: hGetElementAbsolutePosition(element).y
          - this.maskProperties.padding - hGetScollPosition().y,
      },
    };
  }

  /**
   * Method to get element properties.
   * @param element: Element|null = null
   * @param selector: string
   * @return PositionProperties | null
   */
  private getElementProperties(
    element: ElementInterface|null = null,
    selector: string,
  ): Promise<MaskPropertiesInterface | null> {
    return new Promise((resolve) => {
      if (!element) {
        this.stopTour();
        throw new Error(`The given item: '${selector}' does not exist in the page structure.`);
      }

      const boundingClientRect = element.getBoundingClientRect();
      this[element.nodeName === 'IMG' ? 'resolveElementImage' : 'resolveAnyElement'](
        element,
        boundingClientRect,
        resolve,
      );
      return null;
    });
  }

  /**
   * Method to get properties for any element.
   * @param element: Element|null = null
   * @param boundingClientRect: DOMRect|null = null
   * @param (value?: MaskPropertiesInterface | PromiseLike<MaskPropertiesInterface>) => void
   */
  private resolveAnyElement(
    element: ElementInterface|null = null,
    boundingClientRect: DOMRect|null = null,
    resolve: (value?: MaskPropertiesInterface | PromiseLike<MaskPropertiesInterface>) => void,
  ): void {
    hScrollTo(element, () => resolve(this.setMaskProperties(boundingClientRect, element)));
  }

  /**
   * Method to get properties for image element.
   * @param element: Element|null = null
   * @param boundingClientRect: DOMRect|null = null
   * @param (value?: MaskPropertiesInterface | PromiseLike<MaskPropertiesInterface>) => void
   */
  private resolveElementImage(
    element: ElementInterface|null = null,
    boundingClientRect: DOMRect|null = null,
    resolve: (value?: MaskPropertiesInterface | PromiseLike<MaskPropertiesInterface>) => void,
  ): void {
    hLoadImage(element.src,
      (size) => hScrollTo(element,
        () => resolve(this.setMaskProperties({
          x: boundingClientRect.x,
          y: element.offsetTop,
          ...size,
        } as DOMRect, element))));
  }
}

import {
  Component,
  Vue,
  Ref,
  Prop,
  Emit,
} from 'vue-property-decorator';
import {
  MaskPropertiesInterface,
  TextPropertiesInterface,
  SettingsTooltipInterface,
  ColorPropertiesInterface,
  ScenarioPropertiesInterface,
  PositionPropertiesInterface,
} from '@/support/interfaces';
import * as Color from 'color';

/**
* AnimTourTooltip
* Component for tooltip for anim tour.
*
* @author Przemysław Drzewicki <przemyslaw.drzewicki@gmail.com>
*/
@Component
export default class AnimTourTooltip extends Vue {
  /**
   * @var Array<ScenarioProperties>
   */
  @Prop({ type: Array, default: [] })
  public scenario!: Array<ScenarioPropertiesInterface>;

  /**
   * @var Array<ScenarioProperties>
   */
  @Prop({ type: Object })
  public currentStep!: ScenarioPropertiesInterface|null;

  /**
   * @var MaskProperties
   */
  @Prop({ type: Object })
  public maskProperties!: MaskPropertiesInterface;

  /**
   * @var TextProperties
   */
  @Prop({ type: Object })
  public texts: TextPropertiesInterface;

  /**
   * @var String
   */
  @Prop({ type: String, default: '#1890ff' })
  public color: string;

  /**
   * @var Number
   */
  @Prop({ type: Number })
  public currentIndex!: number;

  /**
   * @var AnimTourTooltip
   */
  @Ref() readonly animTourTooltipInstance!: this;

  /**
   * @var string
   */
  private stateStep: string;

  /**
   * @var string
   */
  private settingsTooltip: SettingsTooltipInterface = {
    typePosition: 'top',
  };

  /**
   * @var PositionProperties
   */
  private position: PositionPropertiesInterface = {
    x: 0,
    y: 0,
  };

  /**
   * Method fired when component mounted.
   */
  mounted(): void {
    const boundingClientRect = this.animTourTooltipInstance.getBoundingClientRect();
    this.settingsTooltip.typePosition = this.maskProperties.position.y - boundingClientRect.height - 10 < 0 ? 'bottom' : 'top';

    this.position = {
      x: this.getXPosition(boundingClientRect),
      y: this.getYPosition(boundingClientRect),
    };
  }

  /**
   * Method computed to set color.
   * @return ColorPropertiesInterface
   */
  public get getMainColorButton(): ColorPropertiesInterface {
    return {
      '--background': this.color,
      '--background-hover': Color(this.color).lighten(0.2),
    };
  }

  /**
   * Method to get position y for tooltip.
   * @param boundingClientRect: DOMRect
   * @return number
   */
  private getYPosition(boundingClientRect: DOMRect): number {
    return this.settingsTooltip.typePosition === 'top'
      ? this.maskProperties.position.y - boundingClientRect.height - 10
      : this.maskProperties.position.y + this.maskProperties.size.height + 10;
  }

  /**
   * Method to get position x for tooltip.
   * @param boundingClientRect: DOMRect
   * @return number
   */
  private getXPosition(boundingClientRect: DOMRect): number {
    return this.maskProperties.position.x
    + (this.maskProperties.size.width / 2) - (boundingClientRect.width / 2);
  }

  /**
   * Virtual method for client rect.
   * @return DOMRect
   */
  private getBoundingClientRect(): DOMRect {
    this.stateStep = 'next';
    return {} as DOMRect;
  }

  /**
   * Emit to change step tour.
   */
  @Emit('changeStepTour')
  changeStepTour(state: string): string {
    this.stateStep = state;
    return state;
  }

  /**
   * Emit to stop tour.
   */
  @Emit('stopTour')
  stopTour(): void {
    this.stateStep = 'next';
  }
}

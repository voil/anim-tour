import {
  Vue,
  Prop,
  Emit,
  Component,
} from 'vue-property-decorator';
import {
  TextPropertiesInterface,
  ScenarioPropertiesInterface,
} from '@/support/interfaces';

/**
* AnimTourTimeLine
* Component for timeline anim tour.
*
* @author Przemysław Drzewicki <przemyslaw.drzewicki@gmail.com>
*/
@Component
export default class AnimTourTimeLine extends Vue {
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
   * @var Number
   */
  @Prop({ type: Number })
  public currentIndex!: number;

  /**
   * @var TextProperties
   */
  @Prop({ type: Object })
  public texts: TextPropertiesInterface;

  /**
   * @var Number
   */
  public step: number;

  /**
   * Emit change step for tour.
   * @param step: number
   * @return number
   */
  @Emit('setStep')
  public setStep(step: number): number {
    this.step = step;
    return step;
  }

  /**
   * Emit to stop tour.
   */
  @Emit('stopTour')
  stopTour(): void {
    this.step = 0;
  }
}

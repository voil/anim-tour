import {
  SizeStrategyInterface,
  SizePropertiesInterface,
} from '@/support/interfaces';

/**
* LeftBottomSizeStrategy
* Strategy for left bottom size transition.
*
* @implements SizeStrategy
*/
export default class LeftBottomSizeStrategy implements SizeStrategyInterface {
  /**
   * Method to handle resolve strategy.
   * @param startSize: SizeProperties
   * @param endSize: SizeProperties
   * @param step: number
   * @param resolve: (value?: void | PromiseLike<void>) => void
   * @return { position: PositionProperties; end: boolean; }
   */
  public size = (
    startSize: SizePropertiesInterface,
    endSize: SizePropertiesInterface,
    step: number,
    resolve: (value?: void | PromiseLike<void>) => void,
  ): {
    size: SizePropertiesInterface;
    end: boolean;
  } => {
    const startSizeCopy = startSize;
    if (
      startSizeCopy.width <= endSize.width
      && startSizeCopy.height >= endSize.height) {
      resolve();
      return { size: endSize, end: true };
    }

    startSizeCopy.width = startSizeCopy.width > endSize.width
      ? startSizeCopy.width - step : endSize.width;
    startSizeCopy.height = startSizeCopy.height < endSize.height
      ? startSizeCopy.height + step : endSize.height;
    return { size: startSizeCopy, end: false };
  }
}

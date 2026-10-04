import dayjs from 'dayjs';
import {OfferGenerator} from './offer-generator.interface.js';
import {MockServerData} from '../../types/index.js';
import {generateRandomValue, getRandomItem, getRandomItems} from '../../helpers/index.js';

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const MIN_BEDROOMS = 1;
const MAX_BEDROOMS = 8;

const MIN_GUESTS = 1;
const MAX_GUESTS = 10;

const MIN_RATING = 1;
const MAX_RATING = 5;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {
  }

  public generate(): string {
    const title = getRandomItem(this.mockData.titles);
    const description = getRandomItem(this.mockData.descriptions);
    const city = getRandomItem(this.mockData.cities);
    const previewImage = getRandomItem(this.mockData.previewImages);
    const housingType = getRandomItem(this.mockData.housingTypes);
    const hostEmail = getRandomItem(this.mockData.hostEmails);
    const coordinates = getRandomItem(this.mockData.coordinates);
    const photos = getRandomItems(this.mockData.photos, 6).join(', ');
    const amenities = getRandomItems(this.mockData.amenities).join(', ');

    const postDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const bedrooms = generateRandomValue(MIN_BEDROOMS, MAX_BEDROOMS);
    const maxGuests = generateRandomValue(MIN_GUESTS, MAX_GUESTS);

    const rating = generateRandomValue(MIN_RATING, MAX_RATING, 1);

    const isPremium = generateRandomValue(0, 1) === 1 ? 'true' : 'false';
    const isFavorite = generateRandomValue(0, 1) === 1 ? 'true' : 'false';

    const commentsCount = 0;

    return [
      title,
      description,
      postDate,
      city,
      previewImage,
      photos,
      isPremium,
      isFavorite,
      rating,
      housingType,
      bedrooms,
      maxGuests,
      price,
      amenities,
      hostEmail,
      commentsCount,
      coordinates
    ].join('\t');
  }
}

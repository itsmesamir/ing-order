import React from 'react';
import { StarIcon } from '@chakra-ui/icons';
import { Progress, Stack } from '@chakra-ui/react';

import { useReviewsQuery } from 'hooks/useReviewsQuery';

import ReviewCard from './ReviewCard';

const reviews = [
  {
    star: 1,
    value: 0,
  },
  {
    star: 2,
    value: 0,
  },
  {
    star: 3,
    value: 10,
  },
  {
    star: 4,
    value: 40,
  },
  {
    star: 5,
    value: 50,
  },
];

type MenuReviewProps = {
  menuId: number;
};

function MenuReview(props: MenuReviewProps) {
  const { menuId } = props;

  const { data: reviewItems, isLoading: isReviewItemLoading } = useReviewsQuery({
    menuItemId: menuId,
  });

  return (
    <div>
      <div className="bg-orange-50 mt-10 rounded-lg px-5 py-6">
        <div className="flex justify-between">
          <p className="text-xl font-semibold">
            Reviews{' '}
            <span className="text-sm text-gray-500">
              ({reviewItems?.length} reviews for this food)
            </span>
          </p>

          <div className="flex items-center gap-x-1">
            <StarIcon color="yellow.400" boxSize="3" />
            <StarIcon color="yellow.400" boxSize="3" />
            <StarIcon color="yellow.400" boxSize="3" />
            <StarIcon color="yellow.400" boxSize="3" />
            <StarIcon color="yellow.400" boxSize="3" />
            <p className="text-sm font-semibold ml-1">5 Stars</p>
          </div>
        </div>

        <Stack spacing={3} className="flex mt-4">
          {reviews.map(review => (
            <div className="flex gap-x-4 items-center">
              <p className="text-lg font-semibold">{review.star} Stars</p>

              <Progress
                colorScheme="orange"
                width="290px"
                size="sm"
                value={review.value}
                className="rounded"
              />
            </div>
          ))}
        </Stack>
      </div>

      <div className="mt-9">
        <p className="text-xl font-normal">Sort By</p>

        <div className="mt-5 flex flex-col gap-y-6">
          {reviewItems?.map(item => (
            <ReviewCard review={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MenuReview;

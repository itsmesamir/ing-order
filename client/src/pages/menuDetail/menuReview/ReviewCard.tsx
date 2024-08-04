import React from 'react';
import { Center, Divider, Image } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

import { getRelativeTime } from 'utils/date';

import { MenuReview } from 'interface/review';

type ReviewCardProps = {
  review: MenuReview;
};

function ReviewCard(props: ReviewCardProps) {
  const { review } = props;

  return (
    <div className="flex  border border-gray-100 rounded-lg px-5 py-6">
      <Image
        boxSize="40px"
        objectFit="cover"
        src={review.user.imageUrl}
        alt={review.user.name}
        rounded={{ base: 'full' }}
        className="mr-4"
      />

      <div>
        <p className="text-sm font-medium text-gray-600">{review.user.name}</p>

        <div className="flex items-center mt-2 gap-x-4">
          <div className="flex items-center gap-x-1">
            <StarIcon color="yellow.400" boxSize="3" />
            <StarIcon color="yellow.400" boxSize="3" />
            <StarIcon color="yellow.400" boxSize="3" />
            <StarIcon color="yellow.400" boxSize="3" />
            <StarIcon color="yellow.400" boxSize="3" />
            <p className="text-sm font-semibold ml-1">{review.rating} Stars</p>
          </div>

          <Center height="16px">
            <Divider orientation="vertical" />
          </Center>

          <p className="text-sm font-normal text-gray-500">{getRelativeTime(review.createdAt)}</p>
        </div>

        <p className="text-sm font-normal text-gray-700 mt-4">{review.comment}</p>
      </div>
    </div>
  );
}

export default ReviewCard;

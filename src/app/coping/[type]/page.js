import { notFound } from 'next/navigation';
import exercises from '../../../../data/coping-exercises.json';
import ExerciseClient from './ExerciseClient';

export default async function ExercisePage({ params }) {
  const { type } = await params;
  const exercise = exercises.exercises.find(e => e.slug === type);
  if (!exercise) notFound();

  return (
    <>
      <div className="page-header">
        <h2>{exercise.name}</h2>
        <p>{exercise.description}</p>
      </div>
      <ExerciseClient exercise={exercise} />
      <div className="mt-4">
        <a href="/coping" className="btn btn-outline-purple"><i className="bi bi-arrow-left" /> Back to Tools</a>
      </div>
    </>
  );
}

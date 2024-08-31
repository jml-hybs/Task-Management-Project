export interface Card {
	requestedAt: number; // date timestamp the end user requests for the feature/bugfix
	createdAt: number; // date timestamp the request is added to the system
	finishedAt: number; // date timestamp the request is finished and implemented
	title: string;
	description: string;
	attachments: string; // reference to Firebase storage
	points: number; // a number from 1 to 100 indicating the complexity or the time required to finish
	currentBox: 'Pending' | 'In progress' | 'Finished';
	status: string; // simple description of the current status (can be postponed, in progress, code review, testing)
	assignee: string; // the person who is assigned the task
	assigneeId: string; // user id of the person assigned to the task
	requestor: string; // the person who requested the card
	requestorId?: string; // user id of the person who requested the card if available (if the user is not registered in the system this is undefined)
}

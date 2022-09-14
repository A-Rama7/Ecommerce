<?php

namespace App\Controller;

use App\Entity\Comment;
use App\Repository\CommentRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Firebase\JWT\Key;
use Firebase\JWT\JWT;
use Symfony\Component\HttpFoundation\Request;


class CommentController extends AbstractController
{
    #[Route('create/comment', methods: 'POST')]
    public function createComment(Request $request, EntityManagerInterface $manager)
    {

        $data = json_decode($request->getContent());

        $comment = new Comment();
        $comment->setUserId($data->userId);
        $comment->setArticleId($data->articleId);
        $comment->setComment($data->comment);

        $manager->persist($comment);
        $manager->flush();

        return $this->json("Done");
    }

    #[Route('read/comment/{id}', methods: 'GET')]
    public function readComment(UserRepository $user, CommentRepository $comment, int $id)
    {
            $result = $comment->findBy(['article_id' => $id]);

            $count = count($result);
            
            for ($i = 0; $i < $count; $i++) {
                $userId = $result[$i]->getUserId();
                $User = $user->findBy(['id' => $userId]);
                $result[$i]->setUserName($User[0]->getUsername());             
            }

            return $this->json($result);

    }
}

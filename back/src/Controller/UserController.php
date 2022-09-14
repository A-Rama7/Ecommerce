<?php

namespace App\Controller;

use App\Entity\Address;
use App\Entity\Adress;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Serializer;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\ArticleRepository;
use App\Repository\UserRepository;
use App\Entity\Article;
use Firebase\JWT\Key;
use Firebase\JWT\JWT;
use App\Entity\User;
use App\Repository\AddressRepository;

class UserController extends AbstractController
{
  #[Route('/api/register', name: 'register', methods: ['POST'])]
  public function register(Request $request, EntityManagerInterface $manager): Response
  {
    $content = json_decode($request->getContent());
    $user = new User();
    $user->setUsername($content->{'username'});
    $user->setEmail($content->{'email'});
    $hashedPassword = password_hash($content->{'password'}, PASSWORD_BCRYPT);
    $user->setPassword($hashedPassword);
    $user->setAdmin(0);

    // EASY POST
    // $user->setState('');
    // $user->setCity('');
    // $user->setState('');
    // $user->setZip('');
    // $user->setPhone('');


    $manager->persist($user);
    $manager->flush();
    return $this->json('login successful');
  }

  #[Route('/api/login', name: 'login',  methods: ['POST'])]
  public function login(Request $request, UserRepository $repository): Response
  {
    $content = json_decode($request->getContent());
    $password = $content->{'password'};
    $repo = $repository->findOneBy(['email' => $content->{'email'}]);
    if (isset($repo)) {
      if (password_verify($password, $repo->getPassword())) {
        $key = 'LaClePourToken';
        $payload = [
          'id' => $repo->getId(),
          'email' => $repo->getEmail(),
          'username' => $repo->getUsername(),
          "admin" => $repo->getAdmin()
        ];
        $jwt = JWT::encode($payload, $key, 'HS256');
        return $this->json($jwt);

        /*--------------------------------*\
          POUR VERIF SI LE TOKEN EST VALIDE
        \*--------------------------------*/

        // try {
        //   $decoded = JWT::decode($jwt, new Key($key, 'HS256'));
        //   return $this->json($decoded);
        // } catch (\Exception $e) {
        //   return $this->json("erreur");
        // }

      } else {
        return $this->json('mauvais mdp');
      }
    } else {

      return $this->json('mauvais email ou password');
    }
  }

  #[Route('/user/update/{id}', name: 'update_user', methods: ['PUT'])]
  public function update(?User $user, Request $request,  ManagerRegistry $doctrine)
  {
    $content = json_decode($request->getContent());
    $token = $content->headers->token;

    try {
      $key = "LaClePourToken";
      $decoded = JWT::decode($token, new Key($key, 'HS256'));

      $user->setStreet($content->street);
      $user->setCity($content->city);
      $user->setState($content->state);
      $user->setZip($content->zip);
      $entityManager = $doctrine->getManager();
      $entityManager->persist($user);
      $entityManager->flush();
      return $this->json($content);
    } catch (\Exception $e) {
      return $this->json("erreur");
    }
  }

  #[Route(path: '/users', name: 'get_users', methods: 'GET')]
  public function readUsers(UserRepository $userRepository): Response
  {
    $users = $userRepository->findAll();
    // $encoders = [new JsonEncoder()];
    // $normalizers = [new ObjectNormalizer()];
    // $serializer = new Serializer($normalizers, $encoders);
    // $jsonContent = $serializer->serialize(
    //   $users,
    //   "json",
    //   [
    //     "circular_reference_handler" => function ($object) {
    //       return $object->getId();
    //     }
    //   ]
    // );
    // $response = new Response($jsonContent);
    // $response->headers->set("Content-Type", "application/json");
    // return $response;
    return $this->json($users);
  }

  #[Route(path: '/read/user/{id}', name: 'read_user', methods: ['GET'])]
  public function readUser(Request $request, UserRepository $user)
  {

    $token = $request->headers->get('Authorization');

    try {
      //ne change surtout pas la clé
      $key = "LaClePourToken";
      $decoded = JWT::decode($token, new Key($key, 'HS256'));

      $id = $decoded->id;
      $user = $user->findOneBy(['id' => $id]);
      $info = [
        'street' => $user->getStreet(),
        'city' => $user->getCity(),
        'state' => $user->getState(),
        'zip' => $user->getZip()
      ];

      return $this->json($info);
    } catch (\Exception $e) {

      return $this->json("erreur");
    }
  }


  #[Route(path: '/add/adresse', methods: ['POST'])]
  public function addAdress(Request $request, EntityManagerInterface $manager)
  {
    $content = json_decode($request->getContent());

    $token = $content->{'Headers'}->{'token'};

    try {
      $key = "LaClePourToken";
      $decoded = JWT::decode($token, new Key($key, 'HS256'));
      $adress = new Address();
      $adress->setUserId($decoded->id);
      $adress->setStreet($content->street);
      $adress->setCity($content->city);
      $adress->setState($content->state);
      $adress->setZip($content->zip);

      $manager->persist($adress);
      $manager->flush();
      return $this->json("successfull");
    } catch (\Exception $e) {
      return $this->json($e);
    }
  }

  #[Route(path: '/read/adresse/{id}', methods: ['GET'])]
  public function readAdress(UserRepository $user, AddressRepository $adress, int $id)
  {

    $user = $user->findOneBy(['id' => $id]);

    $adress = $adress->findBy(['user_id' => $id]);

    $tab = [$user, $adress];

    return $this->json($tab);

  }

  
  // #[Route(path: '/read/all/user', methods: ['GET'])]
  // public function readAll(UserRepository $user) {
  //   $user = $user->findAll();

  //   return $this->json($user);
  //   // dd($user);
  // }


}
